<?php
namespace App\Controller;

use App\Entity\User;
use App\Form\RegisterType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use FOS\RestBundle\Controller\FOSRestController;

class RegistrationController extends FOSRestController
{
    /**
     * @Rest\Post("/api/register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = new User();
        $userDataFromForm = $request->request->all();
        $entityManager = $this->getDoctrine()->getManager();

        $userExists = $entityManager->getRepository(User::class)->findOneBy(['username' => $userDataFromForm['username']]);
        if (!empty($userExists)) {
            $view = $this->view('User exists, try again', 400);
            return $this->handleView($view);
        }

        $hashedPassword = $passwordEncoder->encodePassword($user, $userDataFromForm['password']);
        $user->setPassword($hashedPassword);
        $user->setEmail($userDataFromForm['email']);
        $user->setUsername($userDataFromForm['username']);
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->handleView($this->view($user, 200));
    }
}
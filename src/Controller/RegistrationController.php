<?php
namespace App\Controller;

use App\Entity\User;
use App\Form\RegisterType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class RegistrationController extends Controller
{
    /**
     * @Route("/registration", name="register_user")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = new User();
        $registerForm = $this->createForm(RegisterType::class, $user);
        $registerForm->handleRequest($request);

        if (!$registerForm->isValid() || !$registerForm->isSubmitted()) {
            return $this->render(
                'registration/registration.html.twig',
                [
                    'form' => $registerForm->createView()
                ]
            );
        }

        $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
        $user->setPassword($password);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->redirect('/');
    }
}
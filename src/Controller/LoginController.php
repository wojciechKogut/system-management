<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Security\Core\Security;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;

class LoginController extends FOSRestController
{
//    /**
//     * @Rest\Post("/api/login")
//     */
//    public function login(Request $request, AuthenticationUtils $authenticationUtils)
//    {
//        return $this->handleView($this->view($request->request->all(), 400));
//    }
}

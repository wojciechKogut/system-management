<?php
namespace App\Api;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Security\Core\Security;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;

class LoginController extends FOSRestController
{
    /**
     * @Rest\Post("/api/login")
     * @return \FOS\RestBundle\View\View|Response
     */
    public function login(Request $request)
    {

        $view = $this->view($request->request, 200);

        return $this->handleView($view);
//        return new JsonResponse(['test' => 'test1']);
    }
}

<?php

namespace App\Controller;

use App\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;

class ForgotPassword extends FOSRestController
{
    /**
     * @param Request $request
     * @param \Swift_Mailer $mailer
     * @Rest\Post("/user/forgot_password")
     */
    public function sendEmail(Request $request, \Swift_Mailer $mailer)
    {
        $em = $this->getDoctrine()->getManager();

        /** @var \App\Entity\User $user */
        $user = $em->getRepository(User::class)->findOneBy(['email' => $request->request->get('email')]);
        $username = '';

        if (empty($user)) {
            $returnMessage['not_found'] = "No user found. If you dont have account ";
        } else {
            $username = $user->getUsername();
            $token = bin2hex(random_bytes(78));

            $user->setRecoveryPassword($token);
            $em->persist($user);
            $em->flush();

            $message = (new \Swift_Message('Hello Email'))
                ->setFrom('noreply@example.com')
                ->setTo($request->request->get('email'))
                ->setBody(
                    $this->renderView(
                        'emails/forgot.html.twig',
                        [
                            'name' => $username,
                            'identifier' => $token,
                            'email' => $request->request->get('email'),
                            'baseUrl' => $this->getParameter('base_url')
                        ]
                    ),
                    'text/html'
                )
            ;

            $mailer->send($message);
            $returnMessage['success'] = 'Now you can check your email';
        }

        return $this->handleView($this->view($returnMessage, 200));
    }
}
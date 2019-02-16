<?php
namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Authorization\AccessDeniedHandlerInterface;
use Symfony\Component\Routing\Router;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AccessDeniedHandler implements AccessDeniedHandlerInterface
{
    protected $router;
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function handle(Request $request, AccessDeniedException $accessDeniedException)
    {
        /** @var \Symfony\Component\HttpFoundation\Session\Session $session */
        $session = $this->container->get('session');

        /** @var \Symfony\Component\Routing\Router $router */
        $router = $this->container->get('router');

        $session->getFlashBag()->add('error', 'You have no access');
        $url = $router->generate('login');

        return new RedirectResponse($url);
    }
}
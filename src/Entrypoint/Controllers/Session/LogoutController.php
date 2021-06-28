<?php


namespace IESLaCierva\Entrypoint\Controllers\Session;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LogoutController
{
    public function execute(Request $request): Response
    {
        $_SESSION['email'] = null;
        $_SESSION['role'] = null;
        $_SESSION['name'] = null;

        return new JsonResponse(['Logged out']);
    }
}
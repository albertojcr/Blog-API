<?php


namespace IESLaCierva\Entrypoint\Controllers\User;


use IESLaCierva\Application\User\GetUserByEmail\GetUserByEmailService;
use IESLaCierva\Infrastructure\Database\MySqlUserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetUserByEmailController
{
    public function __construct()
    {
        $this->service = new GetUserByEmailService(new MySqlUserRepository());
    }

    public function execute(Request $request): Response
    {
        $userEmail = $request->get('userEmail');
        $user = $this->service->execute($userEmail);
        return new JsonResponse($user);
    }
}
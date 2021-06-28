<?php

namespace IESLaCierva\Entrypoint\Controllers\Session;


use IESLaCierva\Infrastructure\Database\MySqlUserRepository;
use IESLaCierva\Infrastructure\Files\CsvUserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginController
{
    public function execute(Request $request): Response
    {

        $email = $request->toArray()['email'];
        $password = $request->toArray()['password'];

        $userRepository = new MySqlUserRepository();
        $user = $userRepository->findByEmail($email);

        if ($user === null) {
            return new JsonResponse(['Invalid email or password'], Response::HTTP_UNAUTHORIZED);
        }

        if ($user->password() !== $password) {
            return new JsonResponse(['Invalid email or password'], Response::HTTP_UNAUTHORIZED);
        }

        $_SESSION['email'] = $email;
        $_SESSION['role'] = $user->role();
        $_SESSION['name'] = $user->name();

        return new JsonResponse(['ok']);

    }
}

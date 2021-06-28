<?php


namespace IESLaCierva\Application\User\GetUserByEmail;


use IESLaCierva\Domain\User\Exceptions\UserNotFoundException;
use IESLaCierva\Domain\User\User;
use IESLaCierva\Domain\User\UserRepository;

class GetUserByEmailService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }
    public function execute(string $email): User {
        $user =  $this->userRepository->findByEmail($email);

        if ($user === null) {
            throw new UserNotFoundException();
        }

        return $user;
    }
}
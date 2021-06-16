<?php


namespace IESLaCierva\Domain\User;


interface UserRepository
{
    public function findAll(): array;

    public function findById(string $id): ?User;

    public function findByEmail(string $email): ?User;

    public function save(User $user): void;
}
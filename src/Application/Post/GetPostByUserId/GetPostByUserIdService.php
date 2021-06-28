<?php


namespace IESLaCierva\Application\Post\GetPostByUserId;


use IESLaCierva\Domain\Post\Post;
use IESLaCierva\Domain\Post\PostRepository;

class GetPostByUserIdService
{
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {

        $this->postRepository = $postRepository;
    }

    public function execute(string $userId): array
    {
        return $this->postRepository->findByUserId($userId);
    }
}
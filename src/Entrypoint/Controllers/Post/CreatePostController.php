<?php

namespace IESLaCierva\Entrypoint\Controllers\Post;

use IESLaCierva\Application\Post\CreatePost\CreatePostService;
use IESLaCierva\Infrastructure\Database\MySqlPostRepository;
use IESLaCierva\Infrastructure\Database\MySqlUserRepository;
use IESLaCierva\Infrastructure\Files\CsvUserRepository;
use IESLaCierva\Infrastructure\Files\JsonPostRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CreatePostController
{
    public function execute(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $service = new CreatePostService(new MySqlPostRepository(), new MySqlUserRepository());
        $newPost = $service->execute($request->get('title'), $request->get('body'), $request->get('userId'));

        return new JsonResponse(['postId' => $newPost->postId()], Response::HTTP_CREATED);
    }
}

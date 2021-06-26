<?php

namespace IESLaCierva\Entrypoint\Controllers\Post;

use IESLaCierva\Application\Post\GetPostById\GetPostByIdService;
use IESLaCierva\Infrastructure\Database\MySqlPostRepository;
use IESLaCierva\Infrastructure\Files\JsonPostRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetPostByIdController
{
    public function execute(Request $request): Response
    {
        $service = new GetPostByIdService(new MySqlPostRepository());
        return new JsonResponse($service->execute($request->get('postId')));
    }
}

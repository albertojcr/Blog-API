<?php

namespace IESLaCierva\Entrypoint\Controllers\Post;

use IESLaCierva\Application\Post\GetAllPost\GetAllPostService;
use IESLaCierva\Infrastructure\Database\MySqlPostRepository;
use IESLaCierva\Infrastructure\Files\JsonPostRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetAllPostController
{
    private GetAllPostService $getAllPostService;

    public function __construct() {
        $this->getAllPostService = new GetAllPostService(new MySqlPostRepository());
    }

    public function execute(Request $request): Response
    {
        $posts = $this->getAllPostService->execute();
        return new JsonResponse($posts);
    }
}

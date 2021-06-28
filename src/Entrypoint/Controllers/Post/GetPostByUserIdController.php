<?php


namespace IESLaCierva\Entrypoint\Controllers\Post;


use IESLaCierva\Application\Post\GetPostByUserId\GetPostByUserIdService;
use IESLaCierva\Infrastructure\Database\MySqlPostRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetPostByUserIdController
{
    public function execute(Request $request): Response
    {
        $service = new GetPostByUserIdService(new MySqlPostRepository());
        return new JsonResponse($service->execute($request->get('userId')));
    }
}
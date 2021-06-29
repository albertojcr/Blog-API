<?php

namespace IESLaCierva\Entrypoint\Controllers\Post;

use IESLaCierva\Application\Post\PublishPost\PublishPostService;
use IESLaCierva\Infrastructure\Database\MySqlPaymentRepository;
use IESLaCierva\Infrastructure\Database\MySqlPostRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PublishPostController
{
    public function execute(Request $request): Response
    {
        $service = new PublishPostService(new MySqlPostRepository(), new MySqlPaymentRepository());
        $service->execute($request->get('postId'));
        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}

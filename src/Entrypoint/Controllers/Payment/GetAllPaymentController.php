<?php


namespace IESLaCierva\Entrypoint\Controllers\Payment;


use IESLaCierva\Application\Payment\GetAllPayment\GetAllPaymentService;
use IESLaCierva\Infrastructure\Database\MySqlPaymentRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GetAllPaymentController
{
    private GetAllPaymentService $getAllPaymentService;

    public function __construct() {
        $this->getAllPaymentService = new GetAllPaymentService(new MySqlPaymentRepository());
    }

    public function execute(Request $request): Response
    {
        $payments = $this->getAllPaymentService->execute();
        return new JsonResponse($payments);
    }
}
<?php


namespace IESLaCierva\Application\Payment\GetAllPayment;


use IESLaCierva\Domain\Payment\PaymentRepository;

class GetAllPaymentService
{
    private PaymentRepository $paymentRepository;

    public function __construct(PaymentRepository $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
    }

    public function execute(): array
    {
        return $this->paymentRepository->findAll();
    }
}
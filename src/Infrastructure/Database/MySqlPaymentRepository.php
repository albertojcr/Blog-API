<?php


namespace IESLaCierva\Infrastructure\Database;

use IESLaCierva\Domain\Payment\Payment;
use IESLaCierva\Domain\Payment\PaymentRepository;
use IESLaCierva\Domain\Payment\ValueObject\Amount;

class MySqlPaymentRepository extends AbstractMySqlRepository implements PaymentRepository
{
    public function findAll(): array
    {
        $stmt = $this->connection->prepare('SELECT * FROM payment');
        $stmt->execute();
        $payments = [];
        while ($row = $stmt->fetch()) {
            $payments[] = $this->hydrate($row);
        }

        return $payments;
    }

    public function findById(string $paymentId): ?Payment
    {
        $stmt = $this->connection->prepare('SELECT * FROM payment WHERE id = :id ');
        $stmt->execute(['id' => $paymentId]);

        if ($stmt->rowCount() === 0) {
            return null;
        }

        return $this->hydrate($stmt->fetch());
    }

    public function findByAuthor(string $authorId): array
    {
        $stmt = $this->connection->prepare('SELECT * FROM payment WHERE user_id = :authorId ');
        $stmt->execute(['authorId' => $authorId]);

        if ($stmt->rowCount() === 0) {
            //return null;
        }

        $payments = [];
        while ($row = $stmt->fetch()) {
            $payments[] = $this->hydrate($row);
        }

        return $payments;
    }

    public function findByPostId(string $postId): ?Payment
    {
        $stmt = $this->connection->prepare('SELECT * FROM payment WHERE post_id = :postId ');
        $stmt->execute(['postId' => $postId]);

        if ($stmt->rowCount() === 0) {
            return null;
        }

        return $this->hydrate($stmt->fetch());
    }

    public function save(Payment $payment): void
    {
        $stmt = $this->connection->prepare('REPLACE INTO payment(id, user_id, amount, date, post_id)
                VALUES (:id, :user_id, :amount, :date, :post_id)');

        $stmt->execute(
            [
                'id' => $payment->paymentId(),
                'user_id' => $payment->authorId(),
                'amount' => $payment->amount()->value(),
                'date' => $payment->paymentDate()->format(DATE_ATOM),
                'post_id' => $payment->postId()
            ]
        );
    }

    private function hydrate(array $data): Payment
    {
        return new Payment(
            $data['id'],
            $data['user_id'],
            new Amount($data['amount']),
            new \DateTimeImmutable($data['date']),
            $data['post_id']
        );
    }

}
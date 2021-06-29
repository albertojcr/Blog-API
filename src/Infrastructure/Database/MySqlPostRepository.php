<?php


namespace IESLaCierva\Infrastructure\Database;


use IESLaCierva\Domain\Post\Post;
use IESLaCierva\Domain\Post\PostRepository;
use IESLaCierva\Domain\Post\ValueObject\Status;

class MySqlPostRepository extends AbstractMySqlRepository implements PostRepository
{

    public function findById(string $id): ?Post
    {
        $stmt = $this->connection->prepare('SELECT * FROM post WHERE id = :id ');
        $stmt->execute(['id' => $id]);

        if ($stmt->rowCount() === 0) {
            return null;
        }

        return $this->hydrate($stmt->fetch());
    }

    public function findAll(): array
    {
        $stmt = $this->connection->prepare('SELECT * FROM post ');
        $stmt->execute();
        $posts = [];
        while ($row = $stmt->fetch()) {
            $posts[] = $this->hydrate($row);
        }

        return $posts;
    }

    public function save(Post $post): void
    {
        $stmt = $this->connection->prepare('REPLACE INTO post(id, title, body, user_id, status, created_at)
                VALUES (:id, :title, :body, :user_id, :status, :created_at)');

        $stmt->execute(
            [
                'id' => $post->postId(),
                'title' => $post->title(),
                'body' => $post->body(),
                'created_at' => $post->createdAt()->format('Y-m-d H:i:s'),
                'user_id' => $post->authorId(),
                'status' => $post->state()->value()
            ]
        );
    }

    private function hydrate(array $data): Post
    {
        return new Post(
            $data['id'],
            $data['title'],
            $data['body'],
            new \DateTimeImmutable($data['created_at']),
            $data['user_id'],
            new Status($data['status'])
        );
    }

    public function findByUserId(string $userId): array
    {
        $stmt = $this->connection->prepare('SELECT * FROM post WHERE user_id = :userId ');
        $stmt->execute(['userId' => $userId]);
        //$stmt->execute();
        $posts = [];
        while ($row = $stmt->fetch()) {
            $posts[] = $this->hydrate($row);
        }

        return $posts;
    }
}
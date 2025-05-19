import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const QuizList = ({ userId }: { userId: string }) => {
  const quizzes = useQuery(orpc.quiz.getAll.queryOptions({ input: { userId } }));
  return (
    <div>
      {quizzes.data?.map((quiz) => (
        <div key={quiz.quiz.id}>
          <div>{quiz.quiz.title}</div>
          <div>{quiz?.jobs?.status}</div>
          <div>{quiz?.jobs?.error}</div>
          <button
            onClick={async () => {
              await orpc.quiz.delete.call({
                quizId: quiz.quiz.id,
                userId,
              });
              toast.success("Quiz deleted");
              quizzes.refetch();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizList;

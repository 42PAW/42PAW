import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Board } from "@/types/enum/board.category.enum";
import { IBoardInfo } from "@/types/interface/board.interface";
import {
  axiosScrap,
  axiosUndoScrap,
  axiosReactComment,
  axiosUndoReactComment,
} from "@/api/axios/axios.custom";

const BoardTemplateUtils = (currentBoardId: number) => {
  const queryClient = useQueryClient();
  const mainBoardCategories = [Board.DEFAULT, Board.TRENDING, Board.FOLLOWING];

  const scrapMutation = useMutation(() => axiosScrap(currentBoardId), {
    onSuccess: async () => {
      for (let i = 0; i < mainBoardCategories.length; i++) {
        await queryClient.setQueryData(
          ["boards", mainBoardCategories[i]],
          (prevData: IBoardInfo[] | any) => {
            if (!prevData) return prevData;

            const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
              page.map((board: IBoardInfo) => {
                if (board.boardId === currentBoardId) {
                  return {
                    ...board,
                    scrapped: true,
                  };
                }
                return board;
              })
            );

            return { ...prevData, pages: updatedBoards };
          }
        );
      }
    },
  });

  const undoScrapMutation = useMutation(() => axiosUndoScrap(currentBoardId), {
    onSuccess: async () => {
      for (let i = 0; i < mainBoardCategories.length; i++) {
        await queryClient.setQueryData(
          ["boards", mainBoardCategories[i]],
          (prevData: IBoardInfo[] | any) => {
            if (!prevData) return prevData;

            const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
              page.map((board: IBoardInfo) => {
                if (board.boardId === currentBoardId) {
                  return {
                    ...board,
                    scrapped: false,
                  };
                }
                return board;
              })
            );

            return { ...prevData, pages: updatedBoards };
          }
        );
      }
    },
  });

  const reactMutation = useMutation(
    () => axiosReactComment(currentBoardId, "LIKE"),
    {
      onSuccess: async () => {
        for (let i = 0; i < mainBoardCategories.length; i++) {
          await queryClient.setQueryData(
            ["boards", mainBoardCategories[i]],
            (prevData: IBoardInfo[] | any) => {
              if (!prevData) return prevData;

              const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
                page.map((board: IBoardInfo) => {
                  if (board.boardId === currentBoardId) {
                    return {
                      ...board,
                      reacted: true,
                      reactionCount: board.reactionCount + 1,
                    };
                  }
                  return board;
                })
              );

              return { ...prevData, pages: updatedBoards };
            }
          );
        }
      },
    }
  );

  const undoReactMutation = useMutation(
    () => axiosUndoReactComment(currentBoardId),
    {
      onSuccess: async () => {
        for (let i = 0; i < mainBoardCategories.length; i++) {
          await queryClient.setQueryData(
            ["boards", mainBoardCategories[i]],
            (prevData: IBoardInfo[] | any) => {
              if (!prevData) return prevData;

              const updatedBoards = prevData.pages.map((page: IBoardInfo[]) =>
                page.map((board: IBoardInfo) => {
                  if (board.boardId === currentBoardId) {
                    return {
                      ...board,
                      reacted: false,
                      reactionCount: board.reactionCount - 1,
                    };
                  }
                  return board;
                })
              );

              return { ...prevData, pages: updatedBoards };
            }
          );
        }
      },
    }
  );

  return { scrapMutation, undoScrapMutation, reactMutation, undoReactMutation };
};

export default BoardTemplateUtils;

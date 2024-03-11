export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  // 用于属性表单的
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行标题',
  isCenter: false
};

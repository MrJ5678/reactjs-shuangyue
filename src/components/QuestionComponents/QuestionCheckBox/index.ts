import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionCheckBoxDefaultProp } from './interface';
import StatComponent from './StatComponent';

export * from './interface';

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckBoxDefaultProp,
  StatComponent
};

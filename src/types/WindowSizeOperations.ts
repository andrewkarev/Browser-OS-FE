import ContextMenuOptions from 'common/contextMenuOptions';

type WindowSizeOperations =
  | ContextMenuOptions.maximize
  | ContextMenuOptions.minimize
  | ContextMenuOptions.restore;

export default WindowSizeOperations;

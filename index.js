import AutoComplete from './autocomplete';
import Avatar from './avatar';
import Dialog from './dialog';
import Form from './form';
import Input from './input';
import Link from './link';
import Select from './select';
import Table from './table';
import Tooltip from './tooltip';

const AileUI = {
  AutoComplete,
  Avatar,
  Dialog,
  Form,
  Input,
  Link,
  Select,
  Table,
  Tooltip
};

const install = (Vue, option = {}) => {
  for (const name in AileUI) {
    if ({}.hasOwnProperty.call(AileUI, name)) {
      AileUI[name].install(Vue, option[name] || {});
    }
  }
};

export default {
  ...AileUI,
  install
};

// export * from './packages';

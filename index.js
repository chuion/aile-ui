import AutoComplete from './lib/autocomplete';
import Avatar from './lib/avatar';
import Dialog from './lib/dialog';
import Form from './lib/form';
import Input from './lib/input';
import Link from './lib/link';
import Select from './lib/select';
import Table from './lib/table';
import Tooltip from './lib/tooltip';

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

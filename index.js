import Autocomplete from './lib/autocomplete';
import Avatar from './lib/avatar';
import Card from './lib/card';
import Dialog from './lib/dialog';
import Form from './lib/form';
import Input from './lib/input';
import Link from './lib/link';
import Select from './lib/select';
import Table from './lib/table';
import Tooltip from './lib/tooltip';

const AileUI = {
  Autocomplete,
  Avatar,
  Card,
  Dialog,
  Form,
  Input,
  Link,
  Select,
  Table,
  Tooltip
};

const install = (Vue, option = {}) => {
  Object.keys(AileUI).forEach(name => {
    AileUI[name].install(Vue, option[name.toLowerCase()] || {});
  });
};

export default {
  ...AileUI,
  install
};

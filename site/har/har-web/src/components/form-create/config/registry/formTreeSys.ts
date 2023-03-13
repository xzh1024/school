const name = 'formTreeSys';

export default function (label: string, field: string, required = true) {
  return {
    icon: 'icon-date',
    label,
    name,
    field,
    rule() {
      return {
        // required: true,
        type: name,
        field,
        title: label,
        info: '',
        options: [],
        props: {},
        effect: { required },
        validate: [
          {
            required,
            message: `${label}不能为空`
          }
        ]
      };
    },
    props() {
      return [];
    }
  };
}

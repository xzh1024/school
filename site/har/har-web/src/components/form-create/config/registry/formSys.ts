const name = 'formSys';

export default function (label: string, field: string, required = true) {
  return {
    icon: 'icon-date',
    label,
    name,
    field,
    rule() {
      return {
        type: name,
        field,
        title: label,
        info: '',
        options: [],
        // effect: {
        //   required: required ? `${label}不能为空` : false
        // }
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

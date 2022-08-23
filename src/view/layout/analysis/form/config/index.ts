export const FormConfig = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '输入框',
      placeholder: '请输入'
    },
    {
      field: 'select',
      type: 'select',
      label: '下拉选择',
      placeholder: '请选择',
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ]
    },
    {
      field: 'realname',
      type: 'radio',
      label: '单选框'
    },
    {
      field: 'date',
      type: 'datePicker',
      label: '日期',
      placeholder: '请选择日期',
      size: 'default',
      format: 'YYYY/MM/DD',
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now()
      }
    }
  ]
}


export default class validator {

  showMsg;

  setShowMsg(showMsg){
    this.showMsg = showMsg;
  }

  email({value, label }) {
    let reg = new RegExp(`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`);
    if (!reg.test(value)) {
      if (this.showMsg) this.showMsg(`o campo ${label ? label : ''} é um email inválido.`)
      return false;
    }

    return true;
  }

  notNull({value, label }) {
    if (!value || value == undefined || value == '' || value == null) {
      if (this.showMsg) this.showMsg(`o campo ${ label ? label : ''} é obrigatório."`)
      return false;
    }

    return true;
  }

  date({value, label }) {
    if (!value || value == undefined || value == '' || value == null) {
      if (this.showMsg) this.showMsg(`o campo ${ label ? label : ''} é obrigatório."`)
      return false;
    }

    return true;
  }

  number({value, label }) {
    if (value && isNaN(value)) {
      if (this.showMsg) this.showMsg(`o campo ${ label ? label : ''} é numérico."`)
      return false;
    }

    return true;
  }


  size({value, label, size = 9 }) {
    console.log('validar size');
    console.log(value, value.lenght, size)
    console.log(value)
    console.log(value.lenght !== size)
    console.log(value && value.lenght !== size)
    if (value && value.lenght !== size) {
      if (this.showMsg) this.showMsg(`o campo ${ label ? label : ''} deve ter exactamente ${size} caracteres."`)
      return false;
    }

    return true;
  }

  handleValidation(fields = []){
    let errors = [];
    fields = Array.from(fields);
    for(let field of fields){
        let type = field.type || 'required';
        let result = this.functionFromType(type, field );
        if(!result) return false;
    }

    return true;
  }

  functionFromType(type, field){
    if(type === 'required'){
      return this.notNull({value: field.value, label: field.label });
    }
    if(type === 'size'){
      return this.size({value: field.value, size: field.size, label: field.label });
    }
    if(type === 'email'){
      return this.email({value: field.value,label: field.label });
    }
    if(type === 'number'){
      return this.number({value: field.value, label: field.label });
    }
    if(type === 'after_or_equal'){
      return this.afterOrEqual({value: field.value, label: field.label, value2: field.value2, label2: field.label2  });
    }  
    if(type === 'confirm_password'){
      return this.confirmPwd({value: field.value, value2: field.value2 });
    }  
    if(type === 'date'){
      return this.date({value: field.value, value2: field.value2 });
    } 
  }

  afterOrEqual({label, value, label2, value2 }) {
    if (value < value2) {
      if (this.showMsg) this.showMsg(`o campo ${label ? label : ''} tem de ser maior ou igual a ${label2 ? label2 : ''}`)
      return false;
    } 
    
    return true; 
    
  }
  
  confirmPwd({value, value2 }) {
    console.log("handleValidation", value);
    console.log("handleValidation confirm", value2);

    console.log("handleValidation this.showMsg", this.showMsg);

    if (value !== value2) {
      if (this.showMsg) this.showMsg(`As senhas não coincidem `)
      return false;
    }

    return true;
  }
}
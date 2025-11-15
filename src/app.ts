class ProjectInput {
  templateElement: HTMLTemplateElement; // el that we want to put
  hostElement: HTMLDivElement; // el where we want to put el
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // content of templateElement (in our case it's a form)
    // second argument 'true' - if we want content to include all nested elements
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attache();
  }

  // method to insert form (element) in a div (hostElement)
  private attache() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

// instantiating a class to render a form
const prjInput = new ProjectInput();

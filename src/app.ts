// Autobind - Method Decorator
function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectInput class
class ProjectInput {
  templateElement: HTMLTemplateElement; // el that we want to put
  hostElement: HTMLDivElement; // el where we want to put el
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

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

    // interacting with form element to style it by ID
    this.element.id = 'user-input';

    // getting access to form inputs
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
    this.attache();
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  // set up an event listener
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  // method to insert form (element) in a div (hostElement)
  private attache() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

// instantiating a class to render a form
const prjInput = new ProjectInput();

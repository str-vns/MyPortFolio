export const InputCreate = [
  {
    title: "Title",
    type: "text",
    placeholder: "Enter title",
    name: "title",
    returnName: "Title",
    required: true,
  },
  {
    title: "Description",
    type: "textarea",
    placeholder: "Enter description",
    name: "description",
    returnName: "Desc",
    required: true,
  },
  {
    title: "Category",
    type: "dropdown",
    placeholder: "Select category",
    name: "category",
    returnName: "Category",
    required: true,
  },
  {
    title: "Github Project Link",
    type: "text",
    placeholder: "Enter GitHub project link",
    name: "githubLink",
    returnName: "GitUrl",
    required: false,
  },
  {
    title: "Features",
    type: "textareaADD",
    placeholder: "Enter features",
    returnName: "Features",
    name: "features",
    required: false,
  },
  {
    title: 'Tools',
    type: "textareaADD",
    placeholder: "Enter tools used",
    returnName: "Tools",
    name: "tools",
    required: false,
  },
  {
    title: 'Programming Languages',
    type: "textareaADD",
    placeholder: "Enter programming languages used",
    returnName: "PLanguages",
    name: "pLanguages",
    required: false,
  },
];

export const dropdownOptions = [
    { value: 'Web', label: 'Web'},
    { value: 'Mobile', label: 'Mobile'},
    { value: 'Server', label: 'Server'},
]
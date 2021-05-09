class SetupFilter {
  constructor(name, header, choices) {
    this.name = name; // 'user', 'status', etc.
    this.header = header; // 'Created by'
    this.choices = choices || null // array
    this.currentValues = null
  }

}
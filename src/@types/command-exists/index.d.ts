declare module 'command-exists' {
  function commandExists(commandName: string, callback: () => null): null
  function commandExists(commandName: string): Promise<string>
  export default commandExists;
  export function sync(commandName: string): boolean
}

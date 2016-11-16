# Pirads

This is the Pirads report project, made with Angular2

For setting up a dev environment refer to [Healthcare wiki](http://wikihealthcare.agfa.net/display/clinapps/Setting+up+Angular+2+project+with+Angular-cli).

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Usage
__Mouse control__

Left click on a sector on the image map, an entry will be added to the table. Or if there's a duplicate, the entry will be highlighted.

Mouse over a score badge to adjust the score.
	
Right click on a sector, or on a table row to add a finding. Or create an entry when the entry doesn't exist.
	
When you want to adjust the score of anotherentry which isn't highlighted, first click the sector of the entry, or the table row.

__Hotkeys__

Left | Right: Change the selected method

Up   | Down: Change the selected finding in an entry

+ | - : Adjust the score of the selected method

Q | W | E : Select a method

1 | 2 | 3 | ... : Select a finding
	

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Notes

When switching between projects, clear the browser cache first. The hotkeys.json file gets cached, and will generate conflicts when switching.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

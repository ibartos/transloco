![image](https://img.shields.io/badge/Angular-14.0.4-DD0031?style=for-the-badge&logo=angular&logoColor=DD0031)
![image](https://img.shields.io/badge/Tailwind_CSS-3.1.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![image](https://img.shields.io/badge/Font_Awesome-6.1.1-339AF0?style=for-the-badge&logo=fontawesome&logoColor=339AF0)


# Stanleybet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:7200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Webstorm config tips

### Configure Prettier

Use prettier for reformat code

    Languages and Frameworks -> Javascript -> Prettier

Enter this pattern in **Run for files** field:

    {**/*,*}.{js,ts,jsx,tsx,css,scss,html}

### Optimize import

Removes unused imports and reorders existing ones on save

    Preferences -> Tools -> Actions on save -> Optimize imports

### Branch name format

Sets a project standard for branch naming

    Preferences -> Tools -> Tasks -> Feature branch name format

add this value:

    ${id}/${summary}

### Connect with JIRA

Start working on tasks directly from WebStorm by updating status and creating branches automatically

    Preferences -> Tools -> Tasks -> Servers

At **Add new server** select **JIRA** and configure with the following values:


**Server URL:**
    https://acetechdev.atlassian.net

**E-mail:**
    your work email address

**Token:**
Can be generated here: https://id.atlassian.com/manage-profile/security/api-tokens

### Enable Task based Time Tracking

Webstorm will track your working time and sync with **JIRA**

    Preferences -> Tools -> Tasks -> Time Traqcking -> Enable

### JsDOC enable rendering

    Preferences -> Editor -> General -> Appearance -> Render documentation comments


## Internationalization and Localization

I18n and l10n with [Angular internationalization](https://angular.io/guide/i18n-overview)

### To extract the source language file, run the following command.
    ng extract-i18n --output-path src/locale

### Translation keys naming convention
Keys should describe their purpose, their type, their location.

**Examples**

    game_update.label.title_create
    menu_list.action.add
    global.action.delete

### Configuring a new language

1. Extract the source language file. 
2. Make a copy of the source language file to create a translation file for the new language.
3. Rename the translation file to add the locale: `messages.xlf --> message.{locale}.xlf`
4. [Define locales in the build configuration](https://angular.io/guide/i18n-common-merge#define-locales-in-the-build-configuration)
5. [Apply specific build option](https://angular.io/guide/i18n-common-merge#define-locales-in-the-build-configuration)
6. Add the new language locale to the languages array in the environment files.
7. Add the new language locale to the languages array in the proxy-server.js file.

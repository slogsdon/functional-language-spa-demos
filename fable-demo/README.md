# Fable Elmish demo

This demo started as the "Simple App" template exposed by Fable, which is available as:

```
dotnet new -i Fable.Template
dotnet new fable -lang F#
```

with some reconfigurations:

- TODO: Upgrade to Fable 2 alpha
- Move `dotnet-fable` CLI tool from `tools` project to the main project in `src`
- Remove `tools` project
- Upgrade `webpack` to v4
- Replace `webpack-serve` instead of `webpack-dev-server`
- Add Elmish with its Navigation package and React
- Add some `webpack` plugins to aid production builds
- Added MIT license
- Replace Paket with `dotnet` CLI package management, which simplifies configuration and removes the dependency on Mono to run Paket

## License

This project is licensed under the MIT License as well. See [LICENSE](LICENSE) for details.

# Installing the CLI

[[toc]]

## macOS

Run the following command:

```bash
curl https://cli.pipedream.com/install | sh
```

This will automatically download and install the `pd` CLI to your Mac. You can also [download the macOS build](https://cli.pipedream.com/darwin/amd64/latest/pd.zip), unzip that archive, and place the `pd` binary somewhere in [your `PATH`](https://opensource.com/article/17/6/set-path-linux). 

## Linux

Download the [CLI build](#cli-builds) for your architecture below. Unzip that archive, and place the `pd` binary somewhere in [your `PATH`](https://opensource.com/article/17/6/set-path-linux).

## Windows (native)

[Download the CLI build for Windows](https://cli.pipedream.com/windows/amd64/latest/pd.zip). Unzip that archive, save `pd.exe` in Program Files, and [add its file path to `Path` in your system environment variables](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/). Use `pd.exe` in a terminal that supports ANSI colors, like the [Windows Terminal](https://github.com/microsoft/terminal).

## Windows (WSL)

Download the appropriate [Linux CLI build](#cli-builds) for your architecture. Unzip that archive, and place the `pd` binary somewhere in [your `PATH`](https://opensource.com/article/17/6/set-path-linux).

## CLI Builds

Pipedream publishes the following builds of the CLI. If you need to use the CLI on another OS or architecture, [please reach out](https://docs.pipedream.com/support/).

| Operating System | Architecture | link                                                             |
| ---------------- | ------------ | ---------------------------------------------------------------- |
| Linux            | amd64        | [download](https://cli.pipedream.com/linux/amd64/latest/pd.zip)   |
| Linux            | 386          | [download](https://cli.pipedream.com/linux/386/latest/pd.zip)     |
| Linux            | arm          | [download](https://cli.pipedream.com/linux/arm/latest/pd.zip)     |
| Linux            | arm64        | [download](https://cli.pipedream.com/linux/arm64/latest/pd.zip)   |
| macOS            | amd64        | [download](https://cli.pipedream.com/darwin/amd64/latest/pd.zip)  |
| Windows          | amd64        | [download](https://cli.pipedream.com/windows/amd64/latest/pd.zip) |

Run `pd` to see a list of all commands, or `pd help <command>` to display help docs for a specific command.

See the [CLI reference](/cli/reference/) for detailed usage and examples for each command.

<Footer />

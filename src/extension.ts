import * as vscode from "vscode";
import { Disposable } from "@hediet/std/disposable";
import { DrawioEditorProvider } from "./DrawioEditorProvider";
import { DrawioTextEditorProvider } from "./DrawioTextEditorProvider";

export class Extension {
	public readonly dispose = Disposable.fn();

	constructor() {
		this.dispose.track(
			vscode.window.registerCustomEditorProvider(
				"hediet.vscode-drawio-text",
				new DrawioTextEditorProvider(),
				{ webviewOptions: { retainContextWhenHidden: true } }
			)
		);

		const enableProposedApi = require("../package.json")
			.enableProposedApi as boolean | undefined;

		if (enableProposedApi) {
			this.dispose.track(
				vscode.window.registerCustomEditorProvider2(
					"hediet.vscode-drawio",
					new DrawioEditorProvider(),
					{
						supportsMultipleEditorsPerDocument: false,
						webviewOptions: { retainContextWhenHidden: true },
					}
				)
			);
		}
	}
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(new Extension());
}

export function deactivate() {}

import { satelliteUrl } from "@/env-config";
import Bus from "@/utils/bus";

const elementId = "usher-satellite";

class Satellite {
	public static isLoaded() {
		return !!document.getElementById(elementId);
	}

	static load() {
		// Render a new Satellite
		if (!satelliteUrl) {
			return Promise.reject();
		}
		const satEl = document.createElement("iframe");
		satEl.setAttribute("id", "usher-satellite");
		satEl.setAttribute("src", satelliteUrl);
		satEl.setAttribute(
			"style",
			`position:absolute !important;left:-9999px !important;top:-9999px !important;pointer-events:none !important;opacity:0 !important;visibility:hidden !important;display:none !important;height:0 !important;width:0 !important;`
		);
		document.body.append(satEl);
		return new Promise((resolve) => {
			Bus.on("loaded", () => {
				resolve(null);
			});
		});
	}

	static remove() {
		// Remove any existing Satellite
		const existingSatEl = document.getElementById("usher-satellite");
		if (
			existingSatEl &&
			existingSatEl !== null &&
			existingSatEl?.parentNode !== null
		) {
			existingSatEl.parentNode.removeChild(existingSatEl);
		}
	}
}

export default Satellite;

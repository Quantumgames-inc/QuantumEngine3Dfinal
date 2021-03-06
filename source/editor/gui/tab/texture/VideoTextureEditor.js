import {Locale} from "../../../locale/LocaleManager.js";
import {ChangeAction} from "../../../history/action/ChangeAction.js";
import {TextureEditor} from "./TextureEditor.js";
import {Editor} from "../../../Editor.js";
import {Slider} from "../../../components/input/Slider.js";
import {NumberBox} from "../../../components/input/NumberBox.js";
import {CheckBox} from "../../../components/input/CheckBox.js";


function VideoTextureEditor(parent, closeable, container, index)
{
	TextureEditor.call(this, parent, closeable, container, index);

	var self = this;
	
	// Volume
	this.form.addText(Locale.volume);
	this.volume = new Slider(this.form);
	this.volume.size.set(80, 18);
	this.volume.setRange(0, 1);
	this.volume.setStep(0.01);
	this.volume.setOnChange(function()
	{
		self.texture.setVolume(self.volume.getValue());
	});
	this.form.add(this.volume);
	this.form.nextRow();

	// Playback Rate
	this.form.addText("Playback Rate");
	this.playbackRate = new NumberBox(this.form);
	this.playbackRate.size.set(60, 18);
	this.playbackRate.setStep(0.1);
	this.playbackRate.setRange(0, Number.MAX_SAFE_INTEGER);
	this.playbackRate.setOnChange(function()
	{
		self.texture.setPlaybackRate(self.playbackRate.getValue());
	});
	this.form.add(this.playbackRate);
	this.form.nextRow();

	// Autoplay
	this.autoplay = new CheckBox(this.form);
	this.form.addText("Autoplay");
	this.autoplay.size.set(18, 18);
	this.autoplay.setOnChange(function()
	{
		Editor.addAction(new ChangeAction(self.texture, "autoplay", self.autoplay.getValue()));
	});
	this.form.add(this.autoplay);
	this.form.nextRow();

	// Loop
	this.loop = new CheckBox(this.form);
	this.form.addText(Locale.loop);
	this.loop.size.set(18, 18);
	this.loop.setOnChange(function()
	{
		self.texture.setLoop(self.loop.getValue());
	});
	this.form.add(this.loop);
	this.form.nextRow();
}

VideoTextureEditor.prototype = Object.create(TextureEditor.prototype);

VideoTextureEditor.prototype.attach = function(texture)
{
	TextureEditor.prototype.attach.call(this, texture);

	this.volume.setValue(this.texture.volume);
	this.autoplay.setValue(this.texture.autoplay);
	this.loop.setValue(this.texture.loop);
	this.playbackRate.setValue(this.texture.playbackRate);
};
export {VideoTextureEditor};
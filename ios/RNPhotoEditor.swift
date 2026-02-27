import Foundation
import UIKit
import iOSPhotoEditor

@objc(RNPhotoEditor)
class RNPhotoEditor: NSObject {

    private var editImagePath: String?
    private var onDoneEditing: RCTResponseSenderBlock?
    private var onCancelEditing: RCTResponseSenderBlock?

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc func methodQueue() -> DispatchQueue {
        return .main
    }

    @objc(Edit:onDone:onCancel:)
    func edit(_ props: NSDictionary, onDone: @escaping RCTResponseSenderBlock, onCancel: @escaping RCTResponseSenderBlock) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }

            self.editImagePath = props["path"] as? String
            self.onDoneEditing = onDone
            self.onCancelEditing = onCancel

            let photoEditor = PhotoEditorViewController(
                nibName: "PhotoEditorViewController",
                bundle: Bundle(for: PhotoEditorViewController.self)
            )

            // Set language translations
            // TODO: Re-enable when TranslationService is added to the iOSPhotoEditor pod
            // if let languages = props["languages"] as? [String: String] {
            //     TranslationService.shared.initTranslations(languages)
            // }

            // Process Image for Editing
            var image: UIImage?
            if let path = self.editImagePath {
                image = UIImage(contentsOfFile: path)
                if image == nil, let url = URL(string: path), let data = try? Data(contentsOf: url) {
                    image = UIImage(data: data)
                }
            }
            photoEditor.image = image

            // Process Stickers
            if let stickers = props["stickers"] as? [String] {
                photoEditor.stickers = stickers.compactMap { UIImage(named: $0) }
            }

            // Process Controls
            if let hiddenControls = props["hiddenControls"] as? [String] {
                photoEditor.hiddenControls = hiddenControls.compactMap { controlName in
                    switch controlName.lowercased() {
                    case "crop": return .crop
                    case "sticker": return .sticker
                    case "draw": return .draw
                    case "text": return .text
                    case "save": return .save
                    case "share": return .share
                    case "clear": return .clear
                    default: return nil
                    }
                }
            }

            // Process Colors
            if let colors = props["colors"] as? [String] {
                photoEditor.colors = colors.compactMap { self.color(fromHexString: $0) }
            }

            // Invoke Editor
            photoEditor.photoEditorDelegate = self

            // The default modal presenting is page sheet in iOS 13, not full screen
            photoEditor.modalPresentationStyle = .fullScreen

            guard let rootViewController = UIApplication.shared.delegate?.window??.rootViewController else { return }

            if let presentedVC = rootViewController.presentedViewController {
                presentedVC.present(photoEditor, animated: true, completion: nil)
            } else {
                rootViewController.present(photoEditor, animated: true, completion: nil)
            }
        }
    }

    // MARK: - Hex Color Utilities

    private func colorComponent(from string: String, start: Int, length: Int) -> CGFloat {
        let startIndex = string.index(string.startIndex, offsetBy: start)
        let endIndex = string.index(startIndex, offsetBy: length)
        var substring = String(string[startIndex..<endIndex])
        if length == 1 {
            substring = "\(substring)\(substring)"
        }
        var hexComponent: UInt64 = 0
        Scanner(string: substring).scanHexInt64(&hexComponent)
        return CGFloat(hexComponent) / 255.0
    }

    private func color(fromHexString hexString: String) -> UIColor? {
        let colorString = hexString.replacingOccurrences(of: "#", with: "").uppercased()
        let alpha: CGFloat
        let red: CGFloat
        let green: CGFloat
        let blue: CGFloat

        switch colorString.count {
        case 3: // #RGB
            alpha = 1.0
            red   = colorComponent(from: colorString, start: 0, length: 1)
            green = colorComponent(from: colorString, start: 1, length: 1)
            blue  = colorComponent(from: colorString, start: 2, length: 1)
        case 4: // #ARGB
            alpha = colorComponent(from: colorString, start: 0, length: 1)
            red   = colorComponent(from: colorString, start: 1, length: 1)
            green = colorComponent(from: colorString, start: 2, length: 1)
            blue  = colorComponent(from: colorString, start: 3, length: 1)
        case 6: // #RRGGBB
            alpha = 1.0
            red   = colorComponent(from: colorString, start: 0, length: 2)
            green = colorComponent(from: colorString, start: 2, length: 2)
            blue  = colorComponent(from: colorString, start: 4, length: 2)
        case 8: // #AARRGGBB
            alpha = colorComponent(from: colorString, start: 0, length: 2)
            red   = colorComponent(from: colorString, start: 2, length: 2)
            green = colorComponent(from: colorString, start: 4, length: 2)
            blue  = colorComponent(from: colorString, start: 6, length: 2)
        default:
            return nil
        }
        return UIColor(red: red, green: green, blue: blue, alpha: alpha)
    }
}

// MARK: - PhotoEditorDelegate

extension RNPhotoEditor: PhotoEditorDelegate {
    func doneEditing(image: UIImage) {
        guard let onDoneEditing = onDoneEditing, let editImagePath = editImagePath else { return }

        let isPNG = (editImagePath as NSString).pathExtension.lowercased() == "png"
        var path = editImagePath

        if path.contains("file://"), let url = URL(string: editImagePath) {
            path = url.path
        }

        let data = isPNG ? image.pngData() : image.jpegData(compressionQuality: 0.8)
        do {
            try data?.write(to: URL(fileURLWithPath: path), options: .atomic)
        } catch {
            NSLog("write error %@", error.localizedDescription)
        }

        onDoneEditing([path])
    }

    func canceledEditing() {
        guard let onCancelEditing = onCancelEditing else { return }
        onCancelEditing([])
    }
}

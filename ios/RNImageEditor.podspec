require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name = "RNImageEditor"
  s.version = package["version"]
  s.summary = package["description"]
  s.description = package["description"]
  s.homepage = package["homepage"]
  s.license = package["license"]
  s.author = package["author"]
  s.source = { :git => "https://github.com/phucprime/react-native-image-editor.git", :tag => s.version }

  s.platforms = { :ios => "13.0" }

  s.preserve_paths = "LICENSE", "package.json"
  s.source_files = "**/*.{h,m,mm}"
  s.dependency "iOSPhotoEditor"

  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
    s.dependency "React-Core"
  end
end

---
title: "Java Script API"
---

```java
import javax.script.*;
import java.io.*;
import java.nio.file.*;
public class ScriptingDemo {
   public static void main(String[] args) {
      finalScriptEngineManager manager = new
         ScriptEngineManager();
      final ScriptEngine engine =
         manager.getEngineByName("js");
      Path scriptFile = Paths.get("sample.js");
      try {
         Reader reader = Files.newBufferedReader(scriptFile);
         engine.eval(reader);
      }catch(IOException | ScriptException e) {
         e.printStackTrace();
      }
   }
}
```
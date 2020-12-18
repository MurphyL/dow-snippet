---
title: "获取所有的 RequestMapping"
list: false
---

> 获取所有的 RequestMapping

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Controller
public class EndpointDocController {

	@Autowired
	private final RequestMappingHandlerMapping handlerMapping;
	 
	@RequestMapping(value="/endpointdoc", method=RequestMethod.GET)
	public void show(Model model) {
		model.addAttribute("handlerMethods", this.handlerMapping.getHandlerMethods());
	} 

}
```
EMACS ?= emacs

publish:
	$(EMACS) --batch \
	  --eval "(load-file \"$$HOME/.emacs\")" \
	  --eval "(require 'ox-publish)" \
	  --eval "(org-publish \"billwear.github.io\" t)"

serve:
	python3 -m http.server 4000

.PHONY: publish serve

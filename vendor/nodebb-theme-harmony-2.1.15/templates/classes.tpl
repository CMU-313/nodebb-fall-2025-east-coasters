<div style="background: white; padding: 10px; font-weight: bold; font-size: 2rem;">
	Enrolled Courses
</div>

<div data-widget-area="header">
	{{{ each widgets.header }}}
	{{widgets.header.html}}
	{{{ end }}}
</div>

<div class="row flex-fill py-2">
	<div class="{{{ if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		{{{ if pagination.pages.length }}}
		<div><!-- IMPORT partials/category/selector-dropdown-left.tpl --></div>
		{{{ end }}}

		<div class="class-categories-container row">
			{{{ each categories }}}
			<div class="col-md-6 col-lg-4 mb-4">
			<a href="{config.relative_path}/classes">
				<div class="class-category-box p-4 border rounded h-100" data-cid="{cid}" style="cursor: pointer;
				background-color: #edededff; min-height: 200px; user-select: none; ">
					<h3 class="mb-2" style="color: #595959ff; font-size: 1rem;">Course Title</h3>
					<hr style="border-top: 1px solid #777777ff; margin-top: 0.5rem; margin-bottom: 0.5rem;">
					{{{ if descriptionParsed }}}
						<p>{descriptionParsed}</p>
					{{{ end }}}
				</div>
			</a>
			</div>
			{{{ end }}}
		</div>

		<!-- IMPORT partials/paginator.tpl -->
	</div>
	<div data-widget-area="sidebar" class="col-lg-3 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
		{{{ each widgets.sidebar }}}
		{{widgets.sidebar.html}}
		{{{ end }}}
	</div>
</div>
<div data-widget-area="footer">
	{{{ each widgets.footer }}}
	{{widgets.footer.html}}
	{{{ end }}}
</div>

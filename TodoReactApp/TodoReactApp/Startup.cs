using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TodoReactApp.Models;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;

namespace TodoReactApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
            services.AddMvc();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "TodoReactApp", Version = "v1" });
                var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "TodoReactApp.xml");
                c.IncludeXmlComments(filePath);
                c.CustomSchemaIds(x =>
                {
                    if (x.IsNested)
                    {
                        // ReSharper disable once StringLastIndexOfIsCultureSpecific.1
                        return x.FullName.Substring(x.FullName.LastIndexOf(".") + 1);
                    }

                    return x.Name;
                });
            });

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddDbContext<TodoContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("TodoappString")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");


            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseRewriter(new RewriteOptions()
                .AddRewrite(@"^(?!(api\/)|(swagger))((.(?!.*\..+))*)$", "/index.html",
                    skipRemainingRules: false));


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetService<TodoContext>();
                context.Database.Migrate();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();

            app.UseMvc();
            app.UseStaticFiles();
        }
    }
}

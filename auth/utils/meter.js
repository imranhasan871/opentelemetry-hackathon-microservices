const { MeterProvider } = require("@opentelemetry/sdk-metrics")

const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus")

const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const meter = () => {
  // Meter
  // OpenTelemetry Metrics Configuration With Prometheus Exporter
  const { endpoint, port } = PrometheusExporter.DEFAULT_OPTIONS;
  console.log(" 😊😊😊😊😊 Prometheus Exporter", endpoint, port);
  const exporter = new PrometheusExporter(
    {
      // endpoint: "http://localhost:9464/metrics"
    },
    () => {
      console.log(
        `prometheus scrape endpoint: http://localhost:${port}${endpoint}`
      );
    }
  );

  const meterProvider = new MeterProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "auth-service",
    }),
  });
  // Register the metric exporter
  meterProvider.addMetricReader(exporter);
  // Get the meter instance from the meter provider
  return meterProvider.getMeter("auth-service");


}


module.exports = meter
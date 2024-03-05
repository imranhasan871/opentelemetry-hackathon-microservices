const {
  trace,
  SpanStatusCode,
  context,
  propagation,
  // metrics
} = require("@opentelemetry/api");

const meter = require("../utils/meter")



const signUpService = require("../services/signUpService");
const { manualSpan } = require("../utils/otel");

const axios = require("axios");

const joi = require("joi");
const CustomError = require("../utils/Error");
const prisma = require("../utils/prisma");
const config = require("../config/config");



const counter = meter().createCounter('http.server.request_per_name.counter', {
  description: 'The number of requests per name the server got',
})

const signUpController = async (req, res, next) => {
  console.log("signup controller", req.body);

  const parentSpan = trace.getSpan(context.active());
  parentSpan.updateName("Sign Up Controller 🍳");


  const traceId = parentSpan.spanContext().traceId;


  // dump data to prometheus
  counter.add(1, {
    route: req.url,
    url: req.url,
    method: req.method,
    ip: req.ip,
    // traceId: traceId
  })


  try {
    const validation = manualSpan(
      "Validation-Tracer",
      "Validation-Span 🍳",
      (span) => {
        const schema = joi.object({
          name: joi.string().required(),
          email: joi.string().email().required(),
          password: joi.string().required(),
        });

        const validate = schema.validate(req.body);

        if (validate.error) {
          error = CustomError.badRequest(validate.error);
          // Get Error Trace
          span.recordException(validate.error);
          span.setStatus({ code: SpanStatusCode.ERROR });
          span.setAttribute("user-email", req.body.email);
          validate.error = error;
        }
        return validate;
      }
    );

    if (validation.error) {
      return next({ traceId, ...error });
    }

    // const user = await signUpService(validation.value, parentSpan);
    const user = await manualSpan(
      "SignUP Service tracer",
      "Signup Service 🍳",
      (span) => {
        return signUpService(validation.value, span);
      }
    );

    console.log("signup controller", user);
    // console.log(data);

    // const existingUser = await context.with(
    //   trace.setSpan(context.active(), parentSpan),
    //   async () => {
    //     const carrier = {};
    //     propagation.inject(context.active(), carrier);

    //     return axios.get(
    //       `${config.user_service_url}/users/email/${validate.value.email}`,
    //       {
    //         headers: carrier,
    //       }
    //     );
    //   }
    // );
    // console.log(existingUser);

    res.status(201).json({
      message: "Please verify your email!",
      user,
      traceId,
    });

    // Set user in span
    parentSpan.setAttribute("user", JSON.stringify(user));
    parentSpan.setStatus({ code: SpanStatusCode.OK });
  } catch (err) {
    const error = CustomError.severError(err, err.status);
    next({ traceId, ...error });
    // Set error in span
    parentSpan.recordException(error);
    parentSpan.setStatus({ code: SpanStatusCode.ERROR });
    parentSpan.setAttribute("user-email", req.body.email);
  } finally {
    parentSpan.end();
    console.log("finally parent span end");
  }
};

module.exports = signUpController;

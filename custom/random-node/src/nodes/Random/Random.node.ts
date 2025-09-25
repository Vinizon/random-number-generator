import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    icon: "file:assets/random.svg",
    group: ["transform"],
    version: 1,
    description: "True Random Number Generator via Random.org",
    defaults: { name: "Random" },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        default: "trng",
        options: [
          {
            name: "True Random Number Generator",
            value: "trng",
            action: "Generate a true random integer",
          },
        ],
      },
      {
        displayName: "Min",
        name: "min",
        type: "number",
        required: true,
        default: 1,
        description: "Minimum integer (inclusive)",
        typeOptions: { minValue: -1000000000, maxValue: 1000000000 },
      },
      {
        displayName: "Max",
        name: "max",
        type: "number",
        required: true,
        default: 60,
        description: "Maximum integer (inclusive)",
        typeOptions: { minValue: -1000000000, maxValue: 1000000000 },
      },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const out: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter("min", i) as number;
      const max = this.getNodeParameter("max", i) as number;

      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error("Min and Max must be integers.");
      }
      if (min > max) {
        throw new Error("Min must be less than or equal to Max.");
      }

      const qs = { num: 1, min, max, col: 1, base: 10, format: "plain", rnd: "new" };

      const response = await this.helpers.request({
        method: "GET",
        url: "https://www.random.org/integers/",
        qs,
        json: false, // resposta é texto puro
        headers: { "User-Agent": "n8n-nodes-random" },
      });

      const text = String(response).trim();
      const value = Number.parseInt(text, 10);
      if (!Number.isInteger(value)) {
        throw new Error(`Unexpected response from random.org: ${text}`);
      }

      const json: IDataObject = { value, min, max, source: "random.org" };
      out.push({ json });
    }

    return [out];
  }
}
